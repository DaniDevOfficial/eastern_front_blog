import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";

export function RouterWrapper() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes >
            </BrowserRouter >


        </>
    )
}