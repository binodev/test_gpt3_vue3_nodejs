<template>
  <div class="OpenAITextGenerator">
    <h1>OpenAI Text Generator</h1>
    <label for="prompt">Prompt:</label>
    <input type="text" id="prompt" v-model="prompt">
    <button @click="generateText">Generate</button>
    <p>{{ generatedText }}</p>
  </div>
</template>

<script>

export default {
  name: 'OpenAITextGenerator',
  data() {
    return {
      prompt: '',
      generatedText: ''
    };
  },
  methods: {
    async generateText() {
        const res = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: this.prompt,
        }),
      });

      const data = await res.json();
      this.generatedText = data.result;
    }
  }
};
</script>
<style scoped>
.OpenAITextGenerator p {
  background-color: #f8f8f8;
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  white-space: pre-wrap;
}

.OpenAITextGenerator {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
}

.OpenAITextGenerator h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.OpenAITextGenerator label {
  display: block;
  margin-bottom: 10px;
}

.OpenAITextGenerator input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 16px;
}

.OpenAITextGenerator button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.OpenAITextGenerator button:hover {
  background-color: #0062cc;
}

.OpenAITextGenerator p {
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.5;
}
</style>