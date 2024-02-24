import { CreatePatientController } from "@modules/patient/use-cases/create-patient/create-patient-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { GetPatientController } from "@modules/patient/use-cases/get-patient/get-patient-controller";
import { UpdatePatientController } from "@modules/patient/use-cases/update-patient/update-patient-controller";
import { DeletePatientController } from "@modules/patient/use-cases/delete-patient/delete-patient-controller";


const patientRoutes = Router()

const createPatientController = new CreatePatientController()
const getPatientController = new GetPatientController()
const updatePatientController = new UpdatePatientController()
const deletePatientController = new DeletePatientController()

patientRoutes.post('/', ensureAuthenticated, createPatientController.handle)
patientRoutes.get('/:id',ensureAuthenticated, getPatientController.handle)
patientRoutes.patch('/:id', ensureAuthenticated, updatePatientController.handle)
patientRoutes.delete('/:id', ensureAuthenticated, deletePatientController.handle)

export { patientRoutes }