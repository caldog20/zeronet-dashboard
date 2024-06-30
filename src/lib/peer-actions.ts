"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

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

export async function GetPeer(id: number) {
    console.log("peer id:", id)
    try {
        const res = await fetch(`http://localhost:8080/api/v1/peers/${id}`);

        if (!res.ok) {
            console.log("get peer error: ", `${res.status} ${res.statusText}`)
            throw new Error(`${res.status} ${res.statusText}`)
        }

        const data = await res.json();

        revalidatePath(`/peer/${id}`)
        return data;

    } catch (error) {
        if (error instanceof (Error)) {
            console.log(error.message)
            throw new Error(error.message)
        } else {
            throw new Error("error fetching data")
        }
    }
}

export async function DeletePeer(currentState: {message: string}, id: number) {
    try {
        const res = await fetch(`http://localhost:8080/api/v1/peers/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            console.log("get peer error: ", `${res.status} ${res.statusText}`)
            return {
                message: `error deleting peer: ${res.status} ${res.statusText}`
            }
        }

    } catch (error) {
        if (error instanceof (Error)) {
            return {
                message: `error deleting peer: ${error.message}`
            }
        } else {
            return {
                message: `error deleting peer: ${error}`
            }
        }
    }

    redirect("/")
}