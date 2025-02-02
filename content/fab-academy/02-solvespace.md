---
title: SolveSpace
date: 2021-03-02
tags:
  - cad
---

Kris introduced [SolveSpace](https://solvespace.com/) on Friday, and it started to click today after tinkering for a while.

![SolveSpace interface, modeling a green hexagon box, inset top, and slots for fingers to pick up the music token.](02-solvespace-box.png)

# Result

<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
<model-viewer src="02-solvespace-box.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="02-solvespace-box.glb-poster.webp" shadow-intensity="1">
</model-viewer>

# Constraints

Using SolveSpace feels like a kind of geometry game, where you sketch a shape, then add constraints until the "degrees of freedom" goes to 0 (dof ok) and the part is fully constrained. But look out, because if you add too many you'll end up with redundant constraints. (I'm not sure why this is treated as an error.)

https://www.youtube.com/watch?v=wPk5TVY0cVo

This video shows the sketches and groups build up the part.

Keyboard shortcuts are a big part of the UX of SolveSpace.

My first challenge was to make a hexagon.

...
