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

  const wingArea = calculateWingArea(plane.wing_span, plane.wing_chord)

  const massOfComponents = calculateMassOfComponents(
    plane.battery,
    plane.motor,
    plane.propeller
  )

  const totalMass = calculateTotalMass(
    plane.mass,
    massOfComponents
  )

  const motorEfficiencyRating = calculateMotorEfficiencyRating(
    plane.propeller,
    plane.motor
  )

  const RPM = calculateRPM(
    motorEfficiencyRating,
    plane.motor.kV,
    plane.battery.battery.voltage
  )

  const weight = calculateWeight(totalMass)

  const minimumVelocity = calculateMinimumVelocity(
    { value: plane.wing_chord * plane.wing_span, units: 'cm^2' },
    plane.coefficient_of_lift,
    weight
  )

  const WCL = calculateWCL(
    totalMass,
    wingArea
  )

  const massOfBattery = calculateMassOfBattery(plane.battery)

  const massOfPropeller = calculateMassOfPropeller(plane.propeller)

  return (
    <>
      <h1>Plane Specs Calculator</h1>
      <p>A calculator for BUS 374 plane design specs</p>
      <br />
      <h2>Plane</h2>
      <p>Wing Span: {plane.wing_span}cm</p>
      <p>Wing Chord: {plane.wing_chord}cm</p>
      <p>Wing Area: {wingArea.value}{wingArea.units}</p>
      <p>Mass: {plane.mass.value}{plane.mass.units}</p>
      <p>Aspect Ratio: {plane.aspect_ratio}</p>
      <p>Coefficient of Lift: {plane.coefficient_of_lift}</p>
      <p>Coefficient of Drag: {plane.coefficient_of_drag}</p>
      <p>Minimum Velocity: {minimumVelocity}m/s</p>
      <p>WCL: {WCL}</p>
      <br />
      <h2>Battery</h2>
      <p>Cells: {plane.battery.battery.cells}</p>
      <p>Voltage: {plane.battery.battery.voltage} Vo</p>
      <p>Capacity: {plane.battery.capacity}mAh</p>
      <p>Mass: {massOfBattery.value}g</p>
      <br />
      <h2>Motor</h2>
      <p>Mass: {plane.motor.mass.value}g</p>
      <p>kV: {plane.motor.kV} Kv</p>
      <p>Efficiency Rating: {motorEfficiencyRating}</p>
      <br />
      <h2>Propeller</h2>
      <p>Diameter: {plane.propeller.diameter} in.</p>
      <p>Pitch: {plane.propeller.pitch} in.</p>
      <p>Mass: {massOfPropeller.value}g</p>
      <br />
      <p>Total Mass: {totalMass.value}{plane.mass.units}</p>
      <p>Weight: {weight}N</p>
    </>
  )
}
