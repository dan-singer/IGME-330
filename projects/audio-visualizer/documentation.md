# shape.viz Documentation - Dan Singer
## Requirements
### Functional Requirements
All of the required controls are implemented, the app starts in a pleasing state, there are no js errors, and a minimalist ui using dat.gui is implmented.
### UI Design & Interaction
The design of the visualizer is minimalist, clean, and aesthetically pleasing. Because this is using dat.gui, the controls are organized and clean. A simple play button at the beginning clearly indicates how to start the visualization.
### Canvas API & Experience
- Noise and screen inversion are implemented.
- Frequency and Waveform data are visualized via the shapes and curves, respectively.
- Gradients are used in shape filling.
### Web Audio API & Experience
- Frequency and Waveform data are visualized via the shapes and curves, respectively.
- A biquadfilter is used as a lowpass node. 
### HTML/CSS & Media
- HTML5 and CSS are valid.
- Embedded web font is used.
### Code Requirements
- JS is in external files and well-commented.
- Revealing module pattern is implemented.
### Impact
Because of the flexibility in how the shape visualization works, any parametric equation can be used to visualize audio. This flexibility and use of OOP is above and beyond of what is required. Also, though the visualization is abstract, the sound data is analgous to what is seen on the screen. Lastly, the visualization is fully responsive; it works on mobile, tablet, and desktop.
## What went right/wrong
Scaling the shapes to fit the screen was difficult, but I implemented a ```scaleToFit``` function to assist me with this. Additionally, coming up with the algorithm to draw the frequency data along an arbitrary path was difficult and required vector math, but I was able to implement this with a flexible superclass with subclasses that could specify an array of vertices. This way, each shape is actually rendered with the same ```render``` method. 

One thing that went wrong is the performance when noise is applied. Because this is a fullscreen application, it's very expensive to apply noise to each and every pixel, and I am unaware of a better way to do this to avoid performance drops, apart from using WebGL and a shader.
## Resources
- [dat.gui](https://github.com/dataarts/dat.gui)
- [Infinity Loop](https://en.wikipedia.org/wiki/Lemniscate_of_Bernoulli)
- [Hypotrochoid](http://www.archimy.com/examples/2d-hypotrochoid.html)
- [Lisajous Curve](http://jwilson.coe.uga.edu/EMAT6680Su07/Francisco/Assignment10/parametric.html)
## Projected Grade
Because of the flexibility of my code, consistent design choice, and implementation of each of the requirements, I would give myself a grade of *98/100*