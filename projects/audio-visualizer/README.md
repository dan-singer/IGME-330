# Web Audio Visualizer - Shape City
This audio visualizer will consist of audio frequencies / waveforms moving along the path of shapes

## Controls
### Shapes
- Circle
- Square
- Infinity Loop
### Sliders
- Volume
- Shape Size
- Brightness?
### Checkboxes
- Sepia Filter
- Noise

## Aesthetic
- Minimalist, with Dat.gui
- Abstract color patterns in the background

## Architecture
- Canvas
    - Drawing the visualization (View)
- WebAudio API
    - Getting the data from this (MODEL)
    - So I should wrap any data inside of an object
- Dat.GUI
    - The view for the data (UI)

## TODO
- Progress Indicator
- 2 more sliders
- 3 checkboxes
- 1 radio button group
- 3 distinct audio choices
- fullscreen
- CSS flexbox
- Use ctx.getImageData and ctx.putImageData
- bezier and cubic curves
- gradient
- rectangles
- waveform data
- audio effect node
- Documentation
