
import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect } from 'react';
import { getProfileThunk } from "./Store/user/userThunk";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileThunk());
  })


  return (
    <></>
  )
}

export default App
