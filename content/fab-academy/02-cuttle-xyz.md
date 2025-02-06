---
title: Cuttle.xyz evaluation
date: 2025-02-05
---

I'm on the small team building [Cuttle CAD for makers](https://cuttle.xyz). It is a browser-based 2D design app, with parametric and scripting features. Because of this, it is the parametric design workflow that I'm most comfortable with. This week I learned to basics of a handful of 3D CAD software, and I wanted to end the week with a [physical object](cardboard-aided-design.md).

![Cuttle interface.](02-cuttle-xyz-interface.png)

Cuttle interface, showing the same component as four instances with different parameters.

Using parameters in Cuttle is different than the constraint-based modelling in [SolveSpace](02-solvespace.md) and [FreeCAD](02-freecad.md). In Cuttle, parameters are emphasized in the interface, and there is not a concept of constraints. This means that to make shapes that a relative to each other, you have to do more math in the scale and position parameters of the shapes.

![Cuttle interface with derived parameters labelled in pink.](02-cuttle-xyz-parameters.png

Cuttle pro tip: make any reused math expressions into parameters. This screenshot labels these derived parameters where they are used in the design.

# Result

![Hex box prototype.](cardboard-aided-design-player.jpg)

Scale model, made with lasercut cardstock.

<video src="cardboard-aided-design-player-token.mp4" autoplay muted loop></video>

Published design, where you can change parameters: [Cuttle Parametric Hexagonal Box](https://cuttle.xyz/@forresto/Hexagon-Box-Parametric-65WPuv1YGPgR)

See my quick rant [encouraging physical prototyping with everyday materials](cardboard-aided-design.md).

# Reference

* [Cuttle.xyz documentation](https://cuttle.xyz/learn/getting-started-with-scripting) and [videos](https://cuttle.xyz/learn/video-tutorials)
* [Laser cut cardstock workshop at Nordic Fablabs Bootcamp](https://nordicfablabs.gitlab.io/nordic_fablabs_bootcamp_2024/workshops/cuttlexyz/) 2024
