// Menunggu halaman dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-mahasiswa");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah form terkirim ke server secara default
  
      // Mengambil nilai input dari formulir
      const id = document.getElementById("id").value.trim();
      const nama = document.getElementById("nama").value.trim();
      const nim = document.getElementById("nim").value.trim();
      const email = document.getElementById("email").value.trim();
      const tanggalLahir = document.getElementById("tanggal_lahir").value;
      const jenisKelamin = document.getElementById("jenis_kelamin").value;
      const jurusan = document.getElementById("jurusan").value.trim();
      const semester = document.getElementById("semester").value.trim();
      const alamat = document.getElementById("alamat").value.trim();
      const noHp = document.getElementById("no_hp").value.trim();
      // const foto = document.getElementById("foto").files[0]; // Mengambil file
      const statusAktif = document.getElementById("status_aktif").value;
  
      // Validasi input sederhana
      if (!id || !nama || !nim || !email || !tanggalLahir || !jenisKelamin || !jurusan || !semester || !alamat || !noHp || !statusAktif) {
        alert("Harap isi semua field formulir dengan benar.");
        return;
      }
  
      // Menampilkan data di console
      console.log("Data Mahasiswa:");
      console.log("id:", id);
      console.log("Nama:", nama);
      console.log("Nim:", nim);
      console.log("Email:", email);
      console.log("Tanggal Lahir:", tanggalLahir);
      console.log("Jenis Kelamin:", jenisKelamin);
      console.log("Jurusan:", jurusan);
      console.log("Semester:", semester);
      console.log("Alamat:", alamat);
      console.log("No. HP:", noHp);
      console.log("Status Aktif:", statusAktif);
  
      if (foto) {
        console.log("Foto:", foto.name);
      } else {
        console.log("Foto: Tidak ada file yang diunggah.");
      }
  
      // Opsional: Menampilkan pesan berhasil
      alert("Data berhasil disimpan!");
      // form.reset(); // Mengosongkan form setelah submit
    });
  });
  