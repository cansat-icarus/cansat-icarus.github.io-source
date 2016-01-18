title: "Mission"
layout: "page"
hidedate: true
---
CanSat Portugal is an educational project of the European Space Agency (ESA), organized in Portugal with the support of CIÊNCIA VIVA - National Agency for Scientific and Technological Culture and the CENTRO AEROESPAÇO of the Aero Club Torres Vedras, with the aim of providing Portuguese students the first experience in projects related to space technology.

The CanSat itself (satellite-shaped tin) is a functional model of a micro-satellite, in that all systems are integrated into the volume of a soda can. It is launched by a rocket to a predefined height (1000 meters) so that during the descent we can perform a scientific experiment, capture its signals (telemetry) and ensure a safe landing.

For more information related to the competition visit [CanSat Portugal](http://cansatportugal.org/cansat-portugal-%C2%B7-english-version.html)
<small>Text adapted from the project page of CanSat Portugal (the one linked above)</small>

### Primary Mission
The primary mission goals are not in our control. It consists in measuring temperature, air pressure and sending that precious data to a ground station on a rate of at least 1Hz (1 sample per second).

### Secondary mission
Here is where it gets interesting!
We will be sending two terrestrial bacteria species along with the can: *Ralstonia pickettii* and *Cupriavidius metallidurans*. These two are commonly isolated in space-related environments such as spacecraft assembly facilities, robot surfaces and at the International Space Station. They share genes related to heavy-metal resistance (HMR), biofilm formation, motility and biosynthesis of cobalamin. Our objective is to establish if specific genes can provide selective advantage to bacteria in hostile environments of rapid changes in physical and chemical properties: acceleration (as in sudden movements or jerk), temperature and oxygen concentration. This has potential applications to astrobiology and [panspermia](https://en.wikipedia.org/wiki/Panspermia).

Additionally, we intend to develop a positioning system similar to GPS, but in reverse: the satellite emits a message every so often and the ground stations register the necessary data to determine the satellite’s position. Results will be compared to those of an actual GPS inside the satellite, which will also be used to help recovering the can.

Furthermore we plan to add controllable telemetry rates and the ability to enable/disable parts of the software remotely in order to conserve both power (as in electricity) and processing power (because the micro-controller has its limits).

### Design
The can itself will be 3D printed (The models will be available when finished) and will contain the micro-controller (an ATmega 2560 with the Arduino bootloader) and the transceiver on the bottom. Above that we have two vertically oriented sensor boards and in the middle of them: micro-tubes containing the bacteria.

The two sensor boards are exactly the same, to ensure full sensor redundancy and connect to the µC through a single cable so that they are easy to remove: just disconnect the cable and slide them out!
