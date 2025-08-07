import {BeatLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <BeatLoader color="#3498db" size={18} />
    </div>
  );
}
