const { default: WorkspaceProvider } = require("./provider");

function WorskspaceLayout({children}) {
  return (
    <WorkspaceProvider>{children}</WorkspaceProvider>
  )
}
export default WorskspaceLayout