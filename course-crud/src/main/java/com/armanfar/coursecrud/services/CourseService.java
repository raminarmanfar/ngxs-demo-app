package com.armanfar.coursecrud.services;

import com.armanfar.coursecrud.models.Course;
import com.armanfar.coursecrud.repositories.CourseRepository;
import javassist.NotFoundException;
import javassist.tools.rmi.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> findAll() {
        List<Course> courses = new ArrayList<>();
        courseRepository.findAll().forEach(courses::add);
        return courses;
    }

    public Course addNewCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course course) {
        Course foundCourse = courseRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        foundCourse.setCourseName(course.getCourseName());
        foundCourse.setAuthor(course.getAuthor());
        foundCourse.setDescription(course.getDescription());
        courseRepository.save(foundCourse);
        return foundCourse;
    }

    public void deleteCourseById(Long id) {
        courseRepository.deleteById(id);
    }
}
