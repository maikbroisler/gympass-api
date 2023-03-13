import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsInsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsInsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsInsRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymsInsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      latitude: -21.4586246,
      longitude: -49.9379908,
      phone: null,
    })

    await gymsInsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      latitude: -21.4586246,
      longitude: -49.9379908,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsInsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        latitude: -21.4586246,
        longitude: -49.9379908,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
