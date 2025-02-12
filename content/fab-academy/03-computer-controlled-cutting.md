---
title: Week 03. Computer Controlled Cutting (WIP)
date: 2025-02-10
---

# CNC Cutting

Stickers!

![alt text](03-roland-calibration-off.jpg)

Calibration off!

![alt text](03-roland-calibration-test.jpg)

Calibration fixer!

![alt text](03-roland-calibration-good.jpg)

Calibration fixed!

# Construction Kit

I made a modular origami part known as _Francis Ow's 60 Degree Unit_. These have ratios that make it easy enough to fold by hand, but by using Cricut to cut and score my material I saved some time, and ended up with very accurate parts.

![alt text](03-fit-kit-5.jpg)

## Design

![Cuttle parametric design.](03-computer-controlled-cutting.md-image-1.png)

I took advantage of Cuttle's parameters and modifiers to make the cut and score lines. 

![Modular origami unit simulated folding in Origami Simulator.](03-computer-controlled-cutting.md-image.png)

I also brought the design into [Origami Simulator](https://origamisimulator.org) to check my angles, which helped me correct a trigonometry issue before cutting.

![alt text](03-fit-steps.jpg)

This is as far as I got with the [Five Intersecting Tetrahedra](http://origametry.net/fit.html) construction. It is quite a puzzle! 

If I do this again I'll redesign the parts to be better for cardstock, or use lighter paper.

# Group work

The group work for the week was to do some test cuts to characterize the realationship of the speed and power settings on the laser cutter. I'm a group of one, building on last year's group work.

## Laser speed and power test cut matrix

![Cuttle setup for parametric stroke colors](03-cuttle-parametric-colors.png)

Parametric colors for the grid of rectangles.

![Cuttle setup for parametric labels.](03-cuttle-parametric-labels.png)

By making the labels parametric, I was able to make testers for different materials without changing the design. I used a pattern with the parameters that each line of the text input becomes a label. Cuttle supports JavaScript in the parameters, so I made derived parameters like this: 

```js
_powers = powers.split("\n")
_speeds = speeds.split("\n")
```

This makes arrays of strings, one for each label. Then in the **Linear Repeat** modifier, I select "customize each repetition" which makes a `rep` index variable in the context of the repeat modifier. In the label text I add the expression `_powers[rep]`. 

All of this scripting is hidden away in the packaged view, when I make the design public on Cuttle.xyz.

![Cuttle parametric test cut design.](03-cuttle-laser-tester.png)

Design source: [Cuttle Parametric Laser Tester](https://cuttle.xyz/@forresto/Laser-Tester-yTS7qaH2wYmv).

## Laser testing

Aalto Fablab's laser cutter is an Epilog Fusion Pro. It had some maintenance the day before. It is nominally 80w, but the tube is well-loved and according the the folks that did the maintenance it is closer to 35w now. So it is due for a tube replacement.

![2024 test results compared with 2025.](03-laser-test-compare.jpg)

Since the machine was recently serviced, it was interesting to compare to last year's test cuts. The results are very similar.

![Laser test cut with 4mm plywood. Speed 5 power 75 was the best.](03-laser-test-4mm-ply.jpg)

Note that my 4mm plywood had masking tape applied, so this photo doesn't show the smoke marks that would have been present. I have not been able to avoid charing and smoke marks while using this machine with plywood. 

When the tube is replaced I can redo these tests with the same parameters, and compare the results.

## Tiny fire

![Back of cardboard laser test showing burnt spot.](03-laser-test-fire.jpg)

I made my first fire with the laser cutter. While doing the cardboard test cut, the rectangle with the least speed and most power had a small fire on the back of the material. It put itself out fast enough that it did not reach the front of the material, so I didn't notice until I removed it from the machine.

Since cardboard cuts well at 20s 50p, there is no reason to use 5s 75p! ⚠️
