export const isAdmin = (req,res,next) => {
  console.log("Checking admin role for user:", req.user?.id, "Role:", req.user?.role);
  
  const userRole = req.user?.role?.toLowerCase();
  
  if(userRole !== "admin"){
    console.log("Access denied: Not an admin");
    return res.status(403).json({message:"Admin only"});
  }
  
  console.log("Admin access granted");
  next();
};