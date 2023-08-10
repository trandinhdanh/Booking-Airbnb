package com.techpower.airbnb.entity;

import com.techpower.airbnb.constant.Role;
import com.techpower.airbnb.constant.Status;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column
    private String name;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column
    private String phone;
    @Column
    private String birthday;
    @Column
    private boolean gender;
    @Column
    private boolean confirmed;
    @Column(name = "code_confirmed", length = 6)
    private String codeConfirmed;
    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "user")
    private List<RoomEntity> rooms;
    @OneToMany(mappedBy = "user")
    private List<OrderEntity> orders;
    @OneToMany(mappedBy = "user")
    private List<FeedbackEntity> feedbacks;
    @OneToMany(mappedBy = "user")
    private List<BlogEntity> blogs;
    @OneToMany(mappedBy = "user")
    List<StatisticalEntity> statistical = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<WishlistEntity> wishlists;


    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, status, role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
