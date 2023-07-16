<script>
    export let count = 3; // Number of skeleton post items to display
  
    // Generate an array of length 'count'
    let skeletonPosts = Array.from({ length: count }, (_, i) => i);
  </script>
  
  <style>
    .skeleton-post {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
  
    .skeleton-post-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(
        to right,
        rgba(221, 221, 221, 0) 0%,
        rgba(221, 221, 221, 0.5) 50%,
        rgba(221, 221, 221, 0) 100%
      );
      background-size: 200% 100%;
      animation: shimmerAnimation 2s infinite linear;
    }
  
    .skeleton-post-content {
      flex-grow: 1;
      height: 16px;
      background: linear-gradient(
        to right,
        rgba(221, 221, 221, 0) 0%,
        rgba(221, 221, 221, 0.5) 50%,
        rgba(221, 221, 221, 0) 100%
      );
      background-size: 200% 100%;
      animation: shimmerAnimation 2s infinite linear;
    }
  
    @keyframes shimmerAnimation {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  </style>
  
  {#each skeletonPosts as post}
    <div class="skeleton-post">
      <div class="skeleton-post-image"></div>
      <div class="skeleton-post-content"></div>
    </div>
  {/each}
  