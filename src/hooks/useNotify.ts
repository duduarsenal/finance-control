import { NotifyDataProps } from "@typings";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useNotify(){
    const [notifications, setNotifications] = useState<NotifyDataProps[]>([]);
    
    function addNotification(type: string, message: string){
        const id = uuidv4();
        setNotifications((prev: NotifyDataProps[]) => [...prev, { id, type, message, open: true }]);
    }

    function removeNotification(id: string){
        setNotifications((prev: NotifyDataProps[]) => prev.map((notif) =>
            notif.id === id ? { ...notif, open: false } : notif
        ))
        
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 300)
    }

    return { notifications, addNotification, removeNotification }
}