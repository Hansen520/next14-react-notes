/*
 * @Date: 2024-01-25 09:50:03
 * @Description: description
 */
import Redis from 'ioredis';

const redis = new Redis("redis://:325600@118.195.176.186:29002/1");

const initialData = {
  "1702459181837": '{"title":"AI sunt aut","content":"AI quia et suscipit suscipit recusandae","updateTime":"2025-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"AI qui est","content":"AI est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"AI ea molestias","content":"AI et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes() {
    const data = await redis.hgetall('notes'); // 获取所有键值对数据
    if (Object.keys(data).length === 0) {
        await redis.hset('notes', initialData); // 如果数据为空，则初始化数据
    }
    return await redis.hgetall('notes'); // 返回所有键值对数据
}

export async function addNote(data: {}) {
    const uuid = Date.now().toString();
    await redis.hset('notes', { [uuid]: data });
    return uuid; // 返回新添加的笔记的uuid
}

export async function updateNote(uuid: string, data: {}) {
    await redis.hset('notes', { [uuid]: data });
}

export async function getNote(uuid: string) {
    return JSON.parse(await redis.hget('notes', uuid) as string); // 返回指定uuid的笔记数据
}

export async function delNote(uuid: string) {
    return redis.hdel('notes', uuid); // 删除指定uuid的笔记
}

export default redis;