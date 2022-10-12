package com.ttlive.utils;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class BaseDao<Entity> implements Dao<Entity>{
	
	@PersistenceContext(unitName = "ttlive")
	protected EntityManager em;
	
	private Class<Entity> clazz;
	
	public BaseDao(Class<Entity> clazz) {
		this.clazz = clazz;
	}
	
	@Override
	public Entity findById(long id) {
		return em.find(clazz, id);		
	}

	@Override
	public List<Entity> findAll() {
		return em.createQuery("SELECT entity FROM " + clazz.getSimpleName() + " entity", clazz).getResultList();     
	}

	@Override
	public void merge(Entity entity) {
		em.merge(entity);		
	}

	@Override
	public void persist(Entity entity) {
		em.persist(entity);		
	}

	@Override
	public void remove(Entity entity) {
		em.remove(entity);
	}

	@Override
	public void flush() {
		em.flush();		
	}
}
