"use server";

import {revalidatePath} from "next/cache";

export async function GetPeers() {
    try {
        const res = await fetch("http://localhost:8080/api/v1/peers");

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`)
        }

        const data = await res.json();

        revalidatePath("/")
        return data;

    } catch (error) {
        if (error instanceof (Error)) {
            throw new Error(error.message)
        } else {
            throw new Error("error fetching data")
        }
    }
}