export default defineEventHandler(async (event) => {
  setCookie(event, 'accessToken', '', { maxAge: -1 });
  return { success: true, message: "Logged out sukses" };
})
