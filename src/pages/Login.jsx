import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useLoginMutation } from "../../store"
import { Link, useNavigate } from "react-router-dom"
import { useBackendErrorHandler } from "../hooks/useBackendErrorHandler"

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { errorHandler } = useBackendErrorHandler()

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    login({ email, password })
      .unwrap()
      .then(() => navigate("/"))
      .catch(errorHandler)
  }

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px 24px 16px 24px", bgcolor: "white", width: "320px" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Login
      </Typography>

      {[
        { label: "Email", ref: emailRef, type: "email", required: true },
        { label: "Password", ref: passwordRef, type: "password", required: true },
      ].map(({ label, ref, type, required }, idx) => (
        <TextField
          key={idx}
          inputProps={{ ref }}
          label={label}
          variant="outlined"
          size="small"
          color="error"
          required={required}
          type={type}
        />
      ))}

      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>

      <Link to="/forget-password" style={{ textAlign: "end" }}>
        <Typography variant="caption" color="blue">
          Forget Password?
        </Typography>
      </Link>
    </Stack>
  )
}

export default Login
