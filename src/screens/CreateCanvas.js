import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Canvas from "react-native-canvas";

const CreateCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      ctx.beginPath();
      ctx.arc(100, 100, 40, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = "blue";
      ctx.fill();
    }
  }, [ref]);
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: "none",
      }}
      ref={ref}
    />
  );
};

export default CreateCanvas;

const styles = StyleSheet.create({});
