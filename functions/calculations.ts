export type Propeller = {
  diameter: number
  pitch: number
}

export type Battery = {
  battery:
    { cells: 2, voltage: 7.4 } |
    { cells: 3, voltage: 11.1 } |
    { cells: 4, voltage: 14.8 }
  capacity: number
}

export type Motor = {
  kV: number
  mass: 40
}

export type Plane = {
  wing_span: number
  wing_chord: number
  coefficient_of_lift: number
  coefficient_of_drag: number
  aspect_ratio: number
  mass: number
  propeller: Propeller
  battery: Battery
  motor: Motor
}

