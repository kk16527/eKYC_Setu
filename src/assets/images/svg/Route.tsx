import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image, Rect } from 'react-native-svg';
import fontStyles from '../../styles/constants';

function Route(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Rect width="23" height="23" fill={"#fff"} />
      <Path fill="url(#pattern0_60145_9798)" d="M0 0H24V24H0z" />
      <Defs>
        <Pattern
          id="pattern0_60145_9798"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_60145_9798" transform="scale(.02083)" />
        </Pattern>
        <Image
          id="image0_60145_9798"
          width={48}
          height={48}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO2ZP2sUQRjGf+hpbEQ7O0GQeJJLYW8iKTRI0ELQIn6FpPIj2NhEIoqiFp5+BlNJJCkO0klQqxBiEUKIF4L/Or2RgfdgGWd2Z2b3zhH3gRf2z7PvPc/Mezu778LfxzjwAPgAfJfQ24tAi4QxAjwGfgHKET+BR8BREhT/Nke4GcupmXgSIF5JPCQRjBeUjcopp7FBlkTDk7voEPgCmJBoOzj3qxbeBBaArsRz4EqBmY8WYW0L76WF976q0Z4FVoCeY6SyZkx8tfAnLLxJC09fG41R4B6wF1i7x408PzwNXLLw9BpR+WgXhS6zLNZLlNB6iPjrHqPdc5RPdv+GkXfBkastZTPpEK/kWm/s5AjvSrKm5VxDal//Bz4Dz4y8rciZVKGPFrYEK1JSIzm8LLSZC5bcnQjxnRDxeNSyjwEXpiIMTJU1UJZn4nWAeM0lNQNngG8e4vVt92yKBjTmPQzMxYgfloFDwFKO+CXhJGXgtLF/Etiw5NmQc6RmYA04YhxrAl+MR4bSr5ODMqA5dy3Hb8nK3pNtUjagX2imLefuSJi4GqB7KAaUlEzLg38eOAjQPTQDOjYLuKeEE3p3G5oBlcM7AbyLvD0nYaBTYn1JwoCqDVDPgBV1CfmiLiEH6hLyhc9I2doqlwt6oz55zw1yHdAtlZvAm5xu3T7wCrhmefaPzRsMM0G2E60Cot/c6netY/Juh8v/M0lsbzQb3Yi8e8BMFQaU48f73bp+OzF0hpQjVoHbwLEY8UUG9AvGU/lcZOIwcFE+ne4Gij7IyRuMrQpGpeExMz2ZxVKjbcO0mPgk36ZcvVEizWQ73P8cGkaHu0aNGv8rfgP8q+Dw+LlsbwAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  )
}

export default Route;
