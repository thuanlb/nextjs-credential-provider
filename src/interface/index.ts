import { type Dispatch, type SetStateAction } from "react";

export type SetStateFunction<T> = Dispatch<SetStateAction<T>>;

export interface ISearchParams {
    filters?: Record<string, unknown>;
    fields?: string[];
    populate?:
        | string
        | Record<string, string | boolean | Omit<ISearchParams, "pagination">>;
    locale?: string;
    sort?: string | string[];
    pagination?: {
        page?: number | string;
        pageSize?: number | string;
        withCount?: boolean;
    };
    q?: string | undefined;
}

export interface IPaginationResponse {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface IResponse<T> {
    data: T[];
    meta: {
        pagination: IPaginationResponse;
    };
}

export enum Status {
    Active = "active",
    InActive = "inActive",
}

export interface ILabelValue {
    label: string;
    value: string | number | React.ReactNode;
}

export type UploadFile = File & { preview: string; id: number; url: string };

export type ImageDropzoneValue = UploadFile | null;