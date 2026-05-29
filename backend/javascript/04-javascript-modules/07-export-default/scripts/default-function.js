// biasanya satu file js itu hanya berisi satu default. dan tidak digabungkan dengan yang named (contohnya: function biasa yang sudah memiliki nama)
export default function bilangHi(name) {
  // kalau default, tidak perlu ada namanya
  // tetapi, memberi nama pada default class/lainnya itu tidak apa supaya tidak membingungkan pada saat import. malahan itu adalah best practicenya

  // tetapi, walaupun kita memberi nama pada default class/function/lainnya. dia tetap akan menggunakan default sebagai nama resminya:
  // jadi seperti
  // export {bilangHi as default}
  console.info(`Hi, ${name}! this is from default function`);
}
