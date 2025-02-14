/*
    fit.scad
    FIT: Five Intersecting Tetrahedra
    Copyright © 2025 Forrest O. Interactive
    Licensed under CC BY 4.0 https://creativecommons.org/licenses/by/4.0/
*/

module hollow_poly(shape_vertices, shape_faces, face_shrink=0.8, hole_grow = 1.05) {
    // Function to find center of a face
    function face_center(vertices, face) = 
        let(
            points = [for(i = face) vertices[i]],
            x = [for(p = points) p[0]],
            y = [for(p = points) p[1]],
            z = [for(p = points) p[2]]
        )
        [(x[0] + x[1] + x[2])/len(face), 
         (y[0] + y[1] + y[2])/len(face), 
         (z[0] + z[1] + z[2])/len(face)];
    
    // Function to shrink a face towards its center
    function shrink_face(vertices, face, shrink_factor) = 
        let(
            center = face_center(vertices, face)
        )
        [for(idx = face)
            let(
                point = vertices[idx],
                vector = point - center
            )
            center + vector * shrink_factor
        ];
    
    // Collect all shrunk faces into a single vertex list
    shrunk_vertices = [
        for(face = shape_faces)
        let(shrunk = shrink_face(shape_vertices, face, face_shrink))
        for(v = shrunk) v
    ];
        
    difference () {
        // polyhedron by itself isn't "water-tight" for difference o_O
        hull() {
            polyhedron(points=shape_vertices, faces=shape_faces);
        }
        
        scale(hole_grow)
        hull() {
            polyhedron(
                points=shrunk_vertices,
                faces=[
                    for(i=[0:len(shrunk_vertices)/3-1])
                    [i*3, i*3+1, i*3+2]
                ]
            );
        }
    }
}

// Tetrahedron basic def via https://github.com/benjamin-edward-morgan/openscad-polyhedra
tetrahedron_vertices = [[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]]/sqrt(8);
tetrahedron_faces = [[0,1,2],[0,2,3],[0,3,1],[1,3,2]];

colors = ["Red", "Blue", "Green", "Yellow", "Purple"];

// The arcsin(1/3) angle properly aligns the tetrahedron with respect to icosahedral symmetry
initial_rot = [0, 31.717, 0]; // arcsin(1/3) ≈ 31.717°

for(i = [0:4]) {
    color(colors[i])
    rotate([0, 0, i * 360/5])
    rotate(initial_rot)
    hollow_poly(tetrahedron_vertices, tetrahedron_faces, face_shrink=2/3);
}