---
title: <model-viewer> for web 3d
date: 2025-01-30
---

I'm using the [`<model-viewer>` web component](https://modelviewer.dev/) to embed 3D models in blog posts. I'm using it to show off [my CAD models from this week](02-cad-comparison.md).

<script type="module" src="/js/model-viewer.min.js"></script>
<model-viewer src="model-viewer-example-box.glb" camera-controls poster="model-viewer-example-box.glb-poster.webp">
</model-viewer>

# glTF/GLB

You need to export your model as GLB (or glTF). If your modeling software doesn't support GLB export, I have found that FreeCAD can import STEP files and export GLB. I did this for my [SolveSpace evaluation](./02-solvespace.md) post.

> glTF/GLB… is the Khronos standard known as the JPEG of 3D and the first format to standardize Physically-Based Rendering (PBR), making your models look realistic under any lighting, on any renderer. It is also compact, compressible, and loads rapidly into the GPU. – [model-viewer FAQ](https://modelviewer.dev/docs/faq.html#entrydocs-general-questions-formats)

## File size

glTF files are text-based, while GLB is the binary version. For the same scene, GLB files will be smaller. I noticed that exporting the example on this page with a fillet ended up much larger, 1.3mb vs 16kb. FreeCAD doesn't have any export options for GLB, but some other software might be able to export it with fewer verticies, good enough for sharing on the web.

# HTML tags

You can preview the GLB and make adjustments with [Model Viewer Editor](https://modelviewer.dev/editor/).

The embed code looks like this, which works in both HTML and Markdown.

``` html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
<model-viewer src="model-viewer-example-box.glb" camera-controls poster="model-viewer-example-box.webp">
</model-viewer>
```

If you want to avoid loading external resources, you can save the model-viewer script to your own site and reference it with `src="/js/model-viewer.min.js"`.

You only need the script tag once per page that has `<model-viewer>` tags.

# CSS style

It's important to not fill the screen with the viewer, because it can "steal" pointer gestures and mouse wheel events for 3D camera movement. This can make it annoying to scroll past the viewer to the rest of your page. I styled my embeds with 80% width to be sure that there is margin on both sides that will always be available for scroll gestures.

``` css
model-viewer {
	width: 80%;
	height: auto;
	aspect-ratio: 4/3;
	margin: auto;
	border: 1px #c4c4c4 solid;
}
```
