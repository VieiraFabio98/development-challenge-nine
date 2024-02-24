import { Router } from "express"
import { patientRoutes } from "./patient/patient-routes"
import { authenticateRoutes } from "./session/session-routes"

const router = Router()

router.use('/patient', patientRoutes)
router.use(authenticateRoutes)

export { router }