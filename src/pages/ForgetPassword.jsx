import React, { useRef } from "react"
import { Stack, Typography, TextField, Button } from "@mui/material"
import { useForgetPasswordMutation } from "../../store"

const ForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation()

  const emailRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    forgetPassword({ email })
  }

  return (
    <Stack
      onSubmit={handleSubmit}
      component="form"
      flexDirection="column"
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white" }}
    >
      <Typography variant="h6" fontWeight="bold" color="red" textAlign="center">
        Forget Password
      </Typography>
      <TextField inputProps={{ ref: emailRef }} label="Email" variant="outlined" size="small" color="error" />
      <Button type="submit" variant="contained" color="error" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  )
}

export default ForgetPassword