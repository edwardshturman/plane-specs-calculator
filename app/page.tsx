import {
  Plane,
  calculateAspectRatio,
  calculateCoefficientOfLift,
  calculateMassOfBattery,
  calculateMassOfComponents,
  calculatePlaneMass,
  calculateMassOfPropeller,
  calculateMinimumVelocity,
  calculateTotalMass,
  calculateWCL,
  calculateWeight,
  calculateWingArea
} from '@/functions/calculations'

export default function Home() {
  const plane: Plane = {
    wing_span: 75,
    wing_chord: 25,
    mass: calculatePlaneMass({
      value: 75 * 25,
      units: 'cm^2'
    }),
    aspect_ratio: calculateAspectRatio(75, 25),
    coefficient_of_drag: 0.3,
    coefficient_of_lift: calculateCoefficientOfLift(0.3, calculateAspectRatio(75, 25)),
    propeller: {
      diameter: 12,
      pitch: 6
    },
    battery: {
      battery: {
        cells: 4,
        voltage: 14.8
      },
      capacity: 5000
    },
    motor: {
      mass: {
        value: 40,
        units: 'g'
      },
      kV: 2000
    }
  }

  const motorEfficiencyRating = calculateMotorEfficiencyRating(
    plane.propeller,
    plane.motor
  )

  return (
    <>
      <h1>Plane Specs Calculator</h1>
      <p>A calculator for BUS 374 plane design specs</p>
      <br />
      <h2>Plane</h2>
      <p>Wing Span: {plane.wing_span}cm</p>
      <p>Wing Chord: {plane.wing_chord}cm</p>
      <p>Wing Area: {plane.wing_span * plane.wing_chord}cm^2</p>
      <p>Mass: {plane.mass.value}{plane.mass.units}</p>
      <p>Aspect Ratio: {plane.aspect_ratio}</p>
      <p>Coefficient of Lift: {plane.coefficient_of_lift}</p>
      <p>Coefficient of Drag: {plane.coefficient_of_drag}</p>
      <p>Minimum Velocity: {calculateMinimumVelocity({value: plane.wing_chord * plane.wing_span, units: 'cm^2'}, plane.coefficient_of_lift, calculateWeight(calculateTotalMass(plane.mass, calculateMassOfComponents(plane.battery, plane.motor, plane.propeller))))}m/s</p>
      <p>WCL: {calculateWCL(calculateTotalMass(plane.mass, calculateMassOfComponents(plane.battery, plane.motor, plane.propeller)), calculateWingArea(plane.wing_span, plane.wing_chord))}</p>
      <br />
      <h2>Battery</h2>
      <p>Cells: {plane.battery.battery.cells}</p>
      <p>Voltage: {plane.battery.battery.voltage} Vo</p>
      <p>Capacity: {plane.battery.capacity}mAh</p>
      <p>Mass: {calculateMassOfBattery(plane.battery).value}g</p>
      <br />
      <h2>Motor</h2>
      <p>Mass: {plane.motor.mass.value}g</p>
      <p>kV: {plane.motor.kV} Kv</p>
      <p>Efficiency Rating: {motorEfficiencyRating}</p>
      <br />
      <h2>Propeller</h2>
      <p>Diameter: {plane.propeller.diameter} in.</p>
      <p>Pitch: {plane.propeller.pitch} in.</p>
      <p>Mass: {calculateMassOfPropeller(plane.propeller).value}g</p>
      <br />
      <p>Total Mass: {calculateTotalMass(plane.mass, calculateMassOfComponents(plane.battery, plane.motor, plane.propeller)).value}{plane.mass.units}</p>
      <p>Weight: {calculateWeight(calculateTotalMass(plane.mass, calculateMassOfComponents(plane.battery, plane.motor, plane.propeller)))}N</p>
    </>
  )
}
