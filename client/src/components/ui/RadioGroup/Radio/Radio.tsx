import { FC } from 'react'

interface RadioProps {

}

const Radio: FC<RadioProps> = ({ }) => {
      return (
            <label className="j-radio">
                  <input type="radio" name="option" />
                  <span className="radio-icon"></span>
                  <span className="radio-label">Вариант 1</span>
            </label>
      )
}

export default Radio;