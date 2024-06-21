/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotifyDataProps } from "@typings";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useNotify(){
        const [notifications, setNotifications] = useState<NotifyDataProps[]>([]);
    
        const addNotification = (type: string, message: string) => {
        const id = uuidv4();
        setNotifications((prev: any) => [...prev, { id, type, message, open: true }]);
        };
        const removeNotification = (id: string) => {
        setNotifications((prev: any) => prev.map((notif: any) =>
            notif.id === id ? { ...notif, open: false } : notif
        ))
        
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 300)
        };

        return { notifications, addNotification, removeNotification }
}