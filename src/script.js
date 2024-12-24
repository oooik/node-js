const apiUrl = 'http://localhost:3000/api/mahasiswa';

// Fungsi untuk mendapatkan data mahasiswa
async function fetchData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const table = document.getElementById('mahasiswaTable');
    table.innerHTML = '';

    data.forEach(mahasiswa => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mahasiswa.id}</td>
            <td>${mahasiswa.nama}</td>
            <td>${mahasiswa.nim}</td>
            <td>${mahasiswa.email}</td>
            <td>${mahasiswa.tanggal_lahir}</td>
            <td>${mahasiswa.jenis_kelamin}</td>
            <td>${mahasiswa.jurusan}</td>
            <td>${mahasiswa.semester}</td>
            <td>${mahasiswa.alamat}</td>
            <td>${mahasiswa.no_hp}</td>
            <td>
                <button onclick="editData(${mahasiswa.id})">Edit</button>
                <button onclick="deleteData(${mahasiswa.id})">Hapus</button>
            </td>
        `;
        table.appendChild(row);
    });
}

// Fungsi untuk menambahkan data
async function addData() {
    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const email = document.getElementById('email').value;
    const tanggal_lahir = document.getElementById('tanggal_lahir').value;
    const jenis_kelamin = document.getElementById('jenis_kelamin').value;
    const jurusan = document.getElementById('jurusan').value;
    const semester = document.getElementById('semester').value;
    const alamat = document.getElementById('alamat').value;
    const no_hp = document.getElementById('no_hp').value;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, nim, email, tanggal_lahir, jenis_kelamin, jurusan, semester, alamat, no_hp })
    });

    fetchData();
}

// Fungsi untuk menghapus data
async function deleteData(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchData();
}

// Fungsi untuk mengedit data
async function editData(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const mahasiswa = await response.json();

    document.getElementById('nama').value = mahasiswa.nama;
    document.getElementById('nim').value = mahasiswa.nim;
    document.getElementById('email').value = mahasiswa.email;
    document.getElementById('tanggal_lahir').value = mahasiswa.tanggal_lahir;
    document.getElementById('jenis_kelamin').value = mahasiswa.jenis_kelamin;
    document.getElementById('jurusan').value = mahasiswa.jurusan;
    document.getElementById('semester').value = mahasiswa.semester;
    document.getElementById('alamat').value = mahasiswa.alamat;
    document.getElementById('no_hp').value = mahasiswa.no_hp;

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.onclick = async () => {
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const email = document.getElementById('email').value;
        const tanggal_lahir = document.getElementById('tanggal_lahir').value;
        const jenis_kelamin = document.getElementById('jenis_kelamin').value;
        const jurusan = document.getElementById('jurusan').value;
        const semester = document.getElementById('semester').value;
        const alamat = document.getElementById('alamat').value;
        const no_hp = document.getElementById('no_hp').value;

        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, nim, email, tanggal_lahir, jenis_kelamin, jurusan, semester, alamat, no_hp })
        });

        fetchData();
    };

    document.querySelector('.form-container').appendChild(updateBtn);
}

// Inisialisasi data
fetchData();
