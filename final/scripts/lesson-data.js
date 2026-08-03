export async function fetchLessons() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const lessons = await response.json();
    return lessons;
  } catch (error) {
    console.error('Lesson fetch error', error);
    return [];
  }
}
