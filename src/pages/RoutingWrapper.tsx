import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export function RouterWrapper() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<input placeholder='Homepage'/>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes >
            </BrowserRouter >


        </>
    )
}