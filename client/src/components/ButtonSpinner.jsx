import {BeatLoader } from 'react-spinners';

export default function ButtonSpinner() {
  return (
    <div style={{
      height: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <BeatLoader color="#3498db" size={10} />
    </div>
  );
}
