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

export function calculateWingArea(plane: Plane) {
  return plane.wing_span * plane.wing_chord
}

export function calculateMassOfPlane(plane: Plane) {
  return 0.25 * calculateWingArea(plane)
}

export function calculateCoefficientOfLift(plane: Plane) {
  return plane.coefficient_of_drag + (0.1 * Math.sqrt(plane.aspect_ratio))
}

export function calculateMassOfBattery(battery: Battery) {
  return (battery.battery.voltage * battery.capacity) / 130
}

export function calculateMassOfPropeller(propeller: Propeller) {
  return propeller.diameter
}

export function calculateMotorEfficiencyRating(plane: Plane) {
  return 1.10 - 3.0E-2 * plane.propeller.diameter - 1.1E-4 * plane.motor.kV - 7.0E-6 * plane.propeller.diameter * plane.motor.kV
}

export function calculateAspectRatio(plane: Plane) {
  return (plane.wing_span ** 2) / (plane.wing_span * plane.wing_chord)
}

export function calculateWCL(plane: Plane) {
  return plane.mass / (calculateWingArea(plane) ** 1.5)
}

export function calculateWeight(plane: Plane) {
  return plane.mass * 9.81
}
