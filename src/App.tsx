import { Heading } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Wrapper } from './pages/Wrapper';

export function App() {
  return (
    <BrowserRouter>
      <Wrapper />
    </BrowserRouter>
  );
}
