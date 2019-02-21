# Web Audio Visualizer - Shape City
This audio visualizer will consist of audio frequencies / waveforms moving along the path of shapes

## Controls
### Shapes
- Circle
- Square
- Infinity Loop

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
- ~~Progress Indicator~~
- 3 more sliders
    - Volume
    - Shape Count
    - Bass Boost
- 3 checkboxes
    - Invert
    - Gradient Shapes
    - Noise
- 1 radio button group
    - Shape selection
- 3 distinct audio choices
    - All custom
- fullscreen
- CSS flexbox
    - Probably use this for audio controls
- Use ctx.getImageData and ctx.putImageData
    - Noise
- bezier and cubic curves
    - Waveforms in bg
- gradient
    - Shapes
- rectangles
    - ???
- waveform data
    - In background as 
- audio effect node
    - bass boost
- ~~Responsive~~
- Documentation
