<script setup lang="ts">
interface Comment {}
interface Props {
  blogId?: number;
}
const props = withDefaults(defineProps<Props>(), {
  blogId: 1, /// về sau ssex sử dụng id này lễ theo blog
});

const comments = ref<any[]>([]);
const newComment = ref("");
const userName = ref("");
const isLoading = ref(false);
const error = ref("");

// Lấy danh sách comments
const fetchComments = async () => {
  isLoading.value = true;
  try {
    comments.value = [
      {
        id: "1",
        blogId: 1,
        content: "Bài viết rất hay và hữu ích!",
        userName: "Nguyễn Văn A",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        blogId: 1,
        content: "Cảm ơn tác giả đã chia sẻ.",
        userName: "Trần Thị B",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: "3",
        blogId: 1,
        content: "Bài viết rất hay và hữu ích!",
        userName: "Nguyễn Văn C",
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];
  } catch (err) {
    error.value = "Không thể tải bình luận. Vui lòng thử lại sau.";
    console.error("Error fetching comments:", err);
  } finally {
    isLoading.value = false;
  }
};

// Thêm comment mới

// Thêm comment mới - sử dụng $fetch thay vì useFetch
const submitComment = async () => {
  if (!newComment.value.trim() || !userName.value.trim()) {
    error.value = "Vui lòng nhập tên và nội dung bình luận";
    return;
  }

  isLoading.value = true;
  error.value = "";

  try {
    const newCommentData = {
      content: newComment.value,
      userName: userName.value,
      blogId: props.blogId,
    };

    // Thêm comment mới vào danh sách comments
    comments.value.unshift(newCommentData);
    // Reset form
    newComment.value = "";
  } catch (err: any) {
    error.value =
      err.message || "Không thể đăng bình luận. Vui lòng thử lại sau.";
    console.error("Error submitting comment:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchComments();
});
</script>

<template>
  <div class="mt-10 border-t pt-8">
    <h3 class="text-2xl font-bold mb-6">Bình luận</h3>

    <!-- Form thêm comment -->
    <div class="bg-gray-50 p-4 rounded-lg mb-8">
      <h4 class="text-lg font-semibold mb-4">Để lại bình luận của bạn</h4>
      <div v-if="error" class="mb-4 text-red-500 text-sm">
        {{ error }}
      </div>

      <div class="mb-4">
        <label
          for="userName"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Tên của bạn</label
        >
        <input
          id="userName"
          v-model="userName"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tên của bạn"
        />
      </div>

      <div class="mb-4">
        <label
          for="comment"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Bình luận</label
        >
        <textarea
          id="comment"
          v-model="newComment"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập bình luận của bạn"
        ></textarea>
      </div>

      <button
        @click="submitComment"
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        <span v-if="isLoading">Đang gửi...</span>
        <span v-else>Gửi bình luận</span>
      </button>
    </div>

    <!-- Danh sách comments -->
    <div v-if="isLoading && comments.length === 0" class="text-center py-8">
      <p>Đang tải bình luận...</p>
    </div>

    <div
      v-else-if="comments.length === 0"
      class="text-center py-8 text-gray-500"
    >
      <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="comment in comments" :key="comment.id" class="border-b pb-4">
        <div class="flex items-start">
          <div class="flex-shrink-0 mr-3">
            <div
              class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600"
            >
              {{ comment.userName?.charAt(0).toUpperCase() || "A" }}
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-baseline">
              <h4 class="text-md font-semibold">{{ comment.userName }}</h4>
              <span class="ml-2 text-xs text-gray-500">{{
                formatDate(comment.createdAt)
              }}</span>
            </div>
            <p class="mt-1 text-gray-800">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
