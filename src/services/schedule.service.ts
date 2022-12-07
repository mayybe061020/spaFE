import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces/api.interface";
import {ScheduleModel, updateScheduleStatus} from "../model/schedule.model";

export async function getSchedule(date: string) {
  try {
    const apiResult = await axios.get(`/schedule`, {
      params: {
        date,
      },
    });
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getSlot() {
  try {
    const apiResult = await axios.get("/slot");
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getBed() {
  try {
    const apiResult = await axios.get("/bed", {
      params: {
        pageSize: 10,
      },
    });
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getServicesAndCourse(
  idCustomer: number,
  keyword: string
) {
  try {
    const apiResult = await axios.get(`/service/findServiceCourse`, {
      params: {
        idCustomer,
        keyword,
      },
    });
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getBedAndStaff(date: string, slotId: number) {
  try {
    const apiResult = await axios.get(`/bed/getStaffAndBedFree`, {
      params: {
        date,
        slot: slotId,
      },
    });
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function createSchedule(payload: any) {
  try {
    const apiResult = await axios.post(`/schedule/create`, payload);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function getDetailSchedule(scheduleId: number) {
  try {
    const apiResult = await axios.get<ScheduleModel>(`/schedule/getById`, {
      params: {
        id: scheduleId,
      },
    });
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}

export async function updateStatusSchedule(payload: updateScheduleStatus) {
  try {
    const apiResult = await axios.post(`/schedule/updateStatus`, payload);
    return apiResult.data;
  } catch (e) {
    const error = e as AxiosError<IErrorResponse>;
    console.error(error);
    throw error.response?.data;
  }
}
