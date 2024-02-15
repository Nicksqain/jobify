import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import './range.scss'
import Input from '../../forms/Input';

interface RangeProps {
      min: number,
      max: number,
      step: number
      setMinRangeValue: React.Dispatch<React.SetStateAction<number>>;
      setMaxRangeValue: React.Dispatch<React.SetStateAction<number>>;
}

const Range: FC<RangeProps> = ({ min, max, step, setMinRangeValue, setMaxRangeValue }) => {
      const [minValue, setMinValue] = useState<number>(min);
      const [maxValue, setMaxValue] = useState<number>(max);

      const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseInt(event.target.value);
            if (newValue <= maxValue) {
                  setMinValue(newValue);
                  setMinRangeValue(newValue)
            }
      };

      const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = parseInt(event.target.value);
            if (newValue >= minValue) {
                  setMaxValue(newValue);
                  setMaxRangeValue(newValue)
            }
      };
      // useEffect(() => {
      //       console.log(minValue)
      // }, [minValue])
      return (
            <div className='dflex flex-row'>
                  <div className='j-range dflex flex-1 flex-column gap-10 pd-5'>
                        <label className='dflex gap-10'><span>От:</span>
                              <span>{min}</span>
                              <input
                                    type="range"
                                    id="min"
                                    name="min"
                                    value={minValue}
                                    onChange={handleMinChange}
                                    min={min}
                                    step={step}
                                    max={maxValue} // Максимальный предел для "От" равен текущему значению "До"
                              />

                        </label>

                        {/* <span>{minValue}</span> */}
                        <Input type='text' setValue={setMinValue as unknown as Dispatch<SetStateAction<string>>} value={minValue}></Input>
                  </div>

                  <div className='j-range dflex flex-1 flex-column gap-10 pd-5'>
                        <label className='dflex gap-10'><span>До:</span>
                              <input
                                    type="range"
                                    id="max"
                                    name="max"
                                    value={maxValue}
                                    onChange={handleMaxChange}
                                    min={minValue} // Минимальный предел для "До" равен текущему значению "От"
                                    step={step}
                                    max={max}
                              />
                              <span>{max}</span>
                        </label>


                        <Input type='text' setValue={setMaxValue as unknown as Dispatch<SetStateAction<string>>} mask={"number"} value={maxValue}></Input>
                  </div>
            </div>
      );
}

export default Range;
