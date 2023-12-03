"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    onP1: boolean;
    onP2: boolean;
    onP3: boolean;
    onP4: boolean;
    onOt: boolean;
    
}

export default function OnTimeRecord({ onP1, onP2, onP3, onP4, onOt }: Props) {
    const [onP1Now, setOnP1Now] = useState(onP1);
    const [onP2Now, setOnP2Now] = useState(onP2);
    const [onP3Now, setOnP3Now] = useState(onP3);
    const [onP4Now, setOnP4Now] = useState(onP4);
    const [onOtNow, setOnOtNow] = useState(onOt);
    
    const handleOnP1 = () => {
        setOnP1Now(!onP1Now);

    }

    return (
        <div>
            <h1>OnTimeRecord</h1>
            <div>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>4</Button>
            </div>

        </div>
    )
}