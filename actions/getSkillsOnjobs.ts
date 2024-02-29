'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getSkillsOnJobs() {
  try {
    
    const skillsOnJobs = await prisma.skillsOnJobs.findMany()

    console.log('SkillsOnJobs:', skillsOnJobs);

    return skillsOnJobs;
  } catch (error) {
    console.error('Error fetching SkillsOnJobs:', error);
    throw error; // Propagate the error
  }
}


getSkillsOnJobs()
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(async () => {
    // Disconnect PrismaClient after operation
    await prisma.$disconnect();
  });


  export default getSkillsOnJobs