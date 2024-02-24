import { container } from "tsyringe"
import { IDateProvider } from "./date-provider/i-date-provider"
import { DayJsDateProvider } from "./date-provider/implementations/day-js-date-provider"



container.registerSingleton<IDateProvider>("DayJsDateProvider", DayJsDateProvider)