document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:3001/tutoriais'; 
  const videoContainer = document.querySelector('.row');
  const searchForm = document.querySelector('form'); 
  const searchInput = document.getElementById("searchInput"); 
  const durationButton = document.getElementById("filterByDuration"); 
  const allButton = document.getElementById("showAll"); 

  function createVideoCard(video) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-4';

    
    const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

    colDiv.innerHTML = `
      <div class="video-thumbnail">
        <a href="${video.url}" target="_blank"><img src="${thumbnailUrl}" alt="Vídeo" class="img-fluid"></a>
      </div>
      <a href="${video.url}" class="url-title" target="_blank""><p class="video-title">${video.titulo}</p></a>
      <p class="video-details">${video.descricao}</p>
    `;

    return colDiv;
  }

  async function fetchVideos(searchQuery = "", filterByDuration = false) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.statusText}`);
      }

      const videos = await response.json();

      
      videoContainer.innerHTML = "";

      let filteredVideos = videos;

      
      if (searchQuery) {
        filteredVideos = filteredVideos.filter(video =>
          video.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.youtubeId && video.youtubeId.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      
      if (filterByDuration) {
        filteredVideos.sort((a, b) => b.duracao - a.duracao); 
      }

      
      filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoContainer.appendChild(videoCard);
      });

      if (filteredVideos.length === 0) {
        videoContainer.innerHTML = "<p class='text-center'>Nenhum vídeo encontrado.</p>";
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    fetchVideos(searchQuery); 
  });

 
  durationButton.addEventListener('click', () => {
    fetchVideos("", true); 
  });

  
  allButton.addEventListener('click', () => {
    fetchVideos(); 
  });

  
  fetchVideos();
});
