import axios from "@/plugins/axios"; // sua instância com token etc

export function baixarPDF(url, filename) {
  return axios.get(url, { responseType: "blob" }).then((response) => {
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  });
}

export function baixarExcel(url, filename) {
  return axios.get(url, { responseType: "blob" }).then((response) => {
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  });
}
