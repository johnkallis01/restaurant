<script setup>
const layout = "default";
</script>

<template>
    <html>
        <head>
            <title>John's Restaurant</title>
        </head>
        <body>
            <NuxtLayout :name="layout">
                <NuxtPage />
            </NuxtLayout>
        </body>
    </html>
</template>